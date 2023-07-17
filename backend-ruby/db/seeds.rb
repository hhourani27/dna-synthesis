# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
machine1 = Machine.create(model: "DNA-SYNTH-96", location: "Nice", status: :idle)
machine1 = Machine.create(model: "DNA-SYNTH-96", location: "Paris", status: :idle_assigned_order)
machine1 = Machine.create(model: "DNA-SYNTH-96", location: "Paris", status: :synthetizing)
machine1 = Machine.create(model: "DNA-SYNTH-96", location: "Paris", status: :waiting_for_dispatch)