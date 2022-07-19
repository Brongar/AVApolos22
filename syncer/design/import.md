# Import procedure

This procedure is ran upon POST request to `/import` endpoint.

Get the next iteration number from control table.

Get the import archive from Object Storage with a iteration number that is equal to (or higher than -> not implemented yet!) the expected iteration number.

Use the `database` dir from the import archive to replace sync database datadir with it.

Use the `filedir` dir from the import archive to sync with the `moodledata/filedir` path on the Moodle installation.

Stop main database and start sync database.

Start main database to start BDR.

Wait for BDR to finish on main database.

Stop sync database.

Create import control record.

Purge Moodle cache.

Restart Moodle.
