const columns = new Map()
  .set('firearm', [
    { cellKey: 'stat_impact', header: 'Impact' },
    { cellKey: 'stat_rounds_per_minute', header: 'Rate of Fire' },
    { cellKey: 'stat_magazine', header: 'Magazine' },
    { cellKey: 'stat_reload_speed', header: 'Reload Speed' },
    { cellKey: 'stat_range', header: 'Range' },
    { cellKey: 'stat_recoil_direction', header: 'Recoil' },
    { cellKey: 'stat_aim_assistance', header: 'Aim Assist' },
    { cellKey: 'stat_zoom', header: 'Zoom' },
    { cellKey: 'stat_stability', header: 'Stability' },
    { cellKey: 'stat_handling', header: 'Handling' }
  ])
  .set('fusion_rifle', [
    { cellKey: 'stat_impact', header: 'Impact' },
    { cellKey: 'stat_charge_time', header: 'Charge Time' },
    { cellKey: 'stat_magazine', header: 'Magazine' },
    { cellKey: 'stat_reload_speed', header: 'Reload Speed' },
    { cellKey: 'stat_range', header: 'Range' },
    { cellKey: 'stat_zoom', header: 'Zoom' },
    { cellKey: 'stat_aim_assistance', header: 'Aim Assist' },
    { cellKey: 'stat_stability', header: 'Stability' },
    { cellKey: 'stat_handling', header: 'Handling' }
  ])
  .set('launcher', [
    { cellKey: 'stat_blast_radius', header: 'Blast Radius' },
    { cellKey: 'stat_velocity', header: 'Velocity' },
    { cellKey: 'stat_rounds_per_minute', header: 'Rate of Fire' },
    { cellKey: 'stat_magazine', header: 'Magazine' },
    { cellKey: 'stat_reload_speed', header: 'Reload Speed' },
    { cellKey: 'stat_aim_assistance', header: 'Aim Assist' },
    { cellKey: 'stat_stability', header: 'Stability' },
    { cellKey: 'stat_handling', header: 'Handling' }
  ])
  .set('sword', [
    { cellKey: 'stat_impact', header: 'Impact' },
    { cellKey: 'stat_defense', header: 'Defense' },
    { cellKey: 'stat_swing_speed', header: 'Swing Speed' },
    { cellKey: 'stat_ammo_capacity', header: 'Ammo' },
    { cellKey: 'stat_efficiency', header: 'Efficiency' }
  ])

export default columns
