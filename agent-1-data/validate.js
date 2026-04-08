#!/usr/bin/env node
// validate.js — checks dorms.json matches the JSON contract

const fs = require('fs');
const path = require('path');

const dormsPath = path.join(__dirname, 'data', 'dorms.json');

let errors = 0;

function fail(msg) {
  console.error('FAIL:', msg);
  errors++;
}

if (!fs.existsSync(dormsPath)) {
  fail('data/dorms.json does not exist');
  process.exit(1);
}

const dorms = JSON.parse(fs.readFileSync(dormsPath, 'utf8'));

if (!Array.isArray(dorms)) {
  fail('dorms.json must be an array');
  process.exit(1);
}

for (const school of dorms) {
  if (!school.school_id) fail(`Missing school_id in ${JSON.stringify(school).slice(0, 60)}`);
  if (!school.school_name) fail(`Missing school_name for ${school.school_id}`);
  if (!school.location) fail(`Missing location for ${school.school_id}`);
  if (!Array.isArray(school.buildings)) fail(`Missing buildings array for ${school.school_id}`);

  for (const building of (school.buildings || [])) {
    const bid = `${school.school_id}/${building.building_id}`;
    if (!building.building_id) fail(`Missing building_id in ${school.school_id}`);
    if (!building.building_name) fail(`Missing building_name for ${bid}`);
    if (!building.source_url) fail(`Missing source_url for ${bid}`);
    if (!Array.isArray(building.room_types)) fail(`Missing room_types for ${bid}`);

    for (const room of (building.room_types || [])) {
      if (room.length_ft === undefined || room.length_ft === null) fail(`Missing length_ft in ${bid}`);
      if (room.width_ft === undefined || room.width_ft === null) fail(`Missing width_ft in ${bid}`);
      if (room.sqft === undefined || room.sqft === null) fail(`Missing sqft in ${bid}`);
      if (!Array.isArray(room.photo_urls)) fail(`photo_urls must be array in ${bid}`);
      if (!room.source_url) fail(`Missing room source_url in ${bid}`);
    }
  }
}

if (errors === 0) {
  console.log(`OK: dorms.json valid — ${dorms.length} school(s), ${dorms.reduce((n, s) => n + s.buildings.length, 0)} building(s)`);
} else {
  console.error(`${errors} error(s) found.`);
  process.exit(1);
}
