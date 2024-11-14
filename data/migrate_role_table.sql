BEGIN;

UPDATE "user" SET "role" = 'admin' WHERE "email" = 'laura.croco@gmail.com';
UPDATE "user" SET "role" = 'admin' WHERE "email" = 'magic.bruno@gmail.com';
UPDATE "user" SET "role" = 'admin' WHERE "email" = 'pie.boulet@gmx.com';
UPDATE "user" SET "role" = 'admin' WHERE "email" = 'micka.biloute@oclock.com';

COMMIT;