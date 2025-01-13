/**
 * ================================================================
 *                  Airtable Scripts - Utility Functions
 * ================================================================
 *
 * ============================================================
 *  Find and Flag Duplicate Records Script
 * ============================================================
 *
 * This script identifies duplicate records in Airtable based on a
 * unique field and flags them by updating a specific column.
 *
 * Instructions:
 * 1. Replace "TABLE_NAME" with the name of the table containing
 *    the records you want to check for duplicates.
 * 2. Replace "UNIQUE_FIELD_NAME" with the name of the field
 *    that should be used to identify duplicates (e.g., email,
 *    phone number, etc.).
 * 3. Replace "DUPLICATE_COLUMN_NAME" with the name of the field
 *    that should be updated to flag duplicate records (e.g.,
 *    a checkbox or status field).
 *
 * The script will:
 * - Find records with the same value in the "UNIQUE_FIELD_NAME".
 * - Flag duplicate records by updating the "DUPLICATE_COLUMN_NAME"
 *   field to `true`.
 *
 * Notes:
 * - Ensure that the field names and table names are correct.
 * - The script processes records in batches of 50 to comply with
 *   Airtable’s API limits.
 *
 * ================================================================
 */
const TABLE_NAME = "";
const UNIQUE_FIELD_NAME = "";
const DUPLICATE_COLUMN_NAME = "";
const TABLE = base.getTable(`${TABLE_NAME}`);

let query = await TABLE.selectRecordsAsync();

let duplicateRecords = query.records.filter((record) => {
  return query.records.find((isDuplicate) => {
    return (
      record.getCellValue(`${UNIQUE_FIELD_NAME}`) ===
        isDuplicate.getCellValue(`${UNIQUE_FIELD_NAME}`) &&
      record.id !== isDuplicate.id
    );
  });
});

let updates = duplicateRecords.map((update) => {
  return {
    id: update.id,
    fields: {
      DUPLICATE_COLUMN_NAME: true,
    },
  };
});

while (updates.length > 0) {
  let batchStart = 0;
  let batchEnd = 50;

  await TABLE.updateRecordsAsync(updates.slice((batchStart, batchEnd)));
  updates = updates.slice(batchEnd);
}
