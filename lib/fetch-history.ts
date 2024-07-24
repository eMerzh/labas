import { text } from "node:stream/consumers";
import { ResultItem } from "./fetch-overpass";
const { Client, Pool } = require("pg");

const pool = new Pool();

/**
 * Get the lastest data if below age treshold, otherwise return Null
 *
 * @param citySlug slug of the browsed city
 * @param dataSlug slug of the current data item
 */
export async function getCurrentItems(
  citySlug: string,
  dataSlug: string,
): Promise<ResultItem[] | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
        SELECT "city_slug", "data_slug", "items", "created" FROM "point_history" WHERE city_slug=$1 AND data_slug=$2 and created > now() - '2h'::interval LIMIT 1
        `,
      [citySlug, dataSlug],
    );
    if (res.rows.length === 0) {
      return null;
    }
    return res.rows[0].items;
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
}

export async function saveResults(
  citySlug: string,
  dataSlug: string,
  overpassItems: ResultItem[],
): Promise<boolean> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      INSERT INTO "point_history" ("city_slug", "data_slug", "items") (
        SELECT $1, $2, $3 WHERE NOT EXISTS (select 1 from "point_history" WHERE city_slug=$1 AND data_slug=$2 and created > now() - '4h'::interval)
      )
      `,
      [citySlug, dataSlug, JSON.stringify(overpassItems)],
    );
    console.log(res.rows[0]);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
  return true;
}

export interface TimeCountResult {
  date: Date;
  count: number;
}

export interface UserCountResut {
  username: string;
  count: number | null;
}

export async function getCountHistory(
  citySlug: string,
  dataSlug: string,
): Promise<TimeCountResult[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      with days as (
        select generate_series(
          date_trunc('day', now()) - '30 day'::interval,
          date_trunc('day', now()),
          '1 day'::interval
        ) as day
      )

      select
        days.day as date,
        (array_agg(jsonb_array_length(items) ORDER BY created DESC))[1] as count

      from days
      left join point_history on date_trunc('day', point_history.created) = days.day and city_slug=$1 AND data_slug=$2
      group by 1

      `,
      [citySlug, dataSlug],
    );

    return res.rows;
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
}

export async function getContributors(
  citySlug: string,
  dataSlug: string,
): Promise<UserCountResut[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      select  count(*), jsonb_path_query(items, '$[*]')->'user'->>'name' as username from (
          select items from point_history where
          city_slug = $1
          and data_slug = $2
          order by created desc
          limit 1
      ) as x
      group by 2;
      `,
      [citySlug, dataSlug],
    );

    return res.rows;
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
}

/**
CREATE SEQUENCE IF NOT EXISTS point_history_id_seq;

-- Table Definition
CREATE TABLE "point_history" (
    "id" int NOT NULL DEFAULT nextval('point_history_id_seq'::regclass),
    "created" timestamptz NOT NULL DEFAULT now(),
    "data_slug" text NOT NULL,
    "city_slug" text NOT NULL,
    "items" JSONB NOT NULL,
    PRIMARY KEY ("id")
);

 */
