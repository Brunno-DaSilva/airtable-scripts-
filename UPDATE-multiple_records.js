/**
 * =================================
 * ======> Airtable Scripts <=======
 * =================================
 *
 * =============================
 *  Update Multiple Records
 * =============================
 *
 * Replace "FIELD_NAME" with the field for the found records you want to update,
 * & replace "VALUE" with the value you want populated.
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
