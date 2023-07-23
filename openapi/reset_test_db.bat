@echo off
set DB_NAME=dna_synthesis_test
set DB_USER=dna_synthesis_backend_user
set DB_PASS=dna_synthesis_backend_password
set SCHEMA_FILE=db_test_schemas.sql
set DATA_FILE=db_test_data.sql

REM Set the password environment variable
set PGPASSWORD=%DB_PASS%

echo Connect to PostgreSQL and drop the database
psql -U %DB_USER% -d postgres -c "DROP DATABASE IF EXISTS %DB_NAME%;"

echo Create the database
psql -U %DB_USER% -d postgres -c "CREATE DATABASE %DB_NAME%;"

echo Import the schema
psql -U %DB_USER% -d %DB_NAME% -f %SCHEMA_FILE%

RechoEM Populate the database with data
psql -U %DB_USER% -d %DB_NAME% -f %DATA_FILE%

echo Database has been successfully reset.

REM Unset the password environment variable
set PGPASSWORD=
