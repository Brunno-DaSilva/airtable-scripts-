/**
 * ================================================================
 *                  Airtable Scripts - Utility Functions
 * ================================================================
 *
 * ================================
 *  Update Multiple Records Script
 * ================================
 *
 * This script allows you to update multiple records in Airtable.
 *
 * Instructions:
 * 1. Replace "FIELD_NAME" with the field name of the records
 *    you wish to update.
 * 2. Replace "VALUE" with the new value that should populate
 *    the specified field for the matching records.
 *
 * Use this script for bulk updates across your Airtable base.
 *
 * Ensure that the script runs in the correct table and that
 * the field names and values are valid.
 *
 * ================================================================
 */

let config = input.config();
let record_ids = config.record_ids;
let TABLE_NAME = "";

let table = base.getTable(`${TABLE_NAME}`);

for (let i = 0; i < record_ids.length; i++) {
  await table.updateRecordAsync(record_ids[i], {
    FIELD_NAME: "VALUE",
  });
}
