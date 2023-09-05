# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_04_051455) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "machines", force: :cascade do |t|
    t.bigint "model_id", null: false
    t.string "location", null: false
    t.integer "status", null: false
    t.integer "synthesis_total_cycles"
    t.integer "synthesis_completed_cycles"
    t.integer "synthesis_current_step"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "current_order_id"
    t.index ["current_order_id"], name: "index_machines_on_current_order_id"
    t.index ["model_id"], name: "index_machines_on_model_id"
  end

  create_table "models", force: :cascade do |t|
    t.string "name", null: false
    t.integer "well_array_rows", null: false
    t.integer "well_array_cols", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", force: :cascade do |t|
    t.text "oligos", default: [], null: false, array: true
    t.integer "status", null: false
    t.bigint "machine_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["machine_id"], name: "index_orders_on_machine_id"
  end

  create_table "wells", force: :cascade do |t|
    t.integer "row", null: false
    t.integer "col", null: false
    t.integer "status", null: false
    t.bigint "machine_id", null: false
    t.string "oligo"
    t.integer "total_cycles"
    t.integer "synthetized_nucleotide_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["machine_id"], name: "index_wells_on_machine_id"
  end

  add_foreign_key "machines", "models"
  add_foreign_key "machines", "orders", column: "current_order_id"
  add_foreign_key "orders", "machines"
  add_foreign_key "wells", "machines"
end
