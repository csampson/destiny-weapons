/**
 * @overview GraphQL schema for weapon records
 * @see {@link http://graphql.org/learn/schema/}
 */

'use strict'

const { buildSchema } = require('graphql')

const schema = buildSchema(`
  enum ZoomLevel {
    short
    medium
    long
  }

  type Weapon {
    category: String!
    damage_type: String!
    description: String!
    icon: String!
    max_zoom: ZoomLevel
    name: String!
    perks: [String]
    stat_aim_assistance: Int
    stat_ammo_capacity: Int
    stat_blast_radius: Int
    stat_charge_time: Int
    stat_defense: Int
    stat_efficiency: Int
    stat_handling: Int
    stat_impact: Int
    stat_magazine: Int
    stat_range: Int
    stat_recoil_direction: Int
    stat_reload_speed: Int
    stat_rounds_per_minute: Int
    stat_stability: Int
    stat_swing_speed: Int
    stat_velocity: Int
    stat_zoom: Int
    tier: String!
  }

  type Query {
    weapons: [Weapon]
  }
`)

module.exports = schema
