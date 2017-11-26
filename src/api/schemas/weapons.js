const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Weapon {
    name: String!
    description: String!
    tier: String!
    category: String!
    damage_type: String!
    icon: String!
    screenshot: String!
    stat_aim_assistance: Int
    stat_handling: Int
    stat_impact: Int
    stat_magazine: Int
    stat_range: Int
    stat_recoil_direction: Int
    stat_reload_speed: Int
    stat_rounds_per_minute: Int
    stat_stability: Int
    stat_zoom: Int
  }

  type Query {
    weapons: [Weapon]
  }
`)

module.exports = schema
