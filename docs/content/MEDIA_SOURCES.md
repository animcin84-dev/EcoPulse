# EcoPulse institutional media sources

EcoPulse uses a deliberately small set of source-backed Earth-science visuals. Photography/satellite imagery supports a concept only when it teaches something the authored SVG/CSS diagram cannot communicate as directly.

## Usage policy

NASA media guidance checked on 2026-09-10:
https://www.nasa.gov/nasa-brand-center/images-and-media/

For this educational implementation:
- NASA is acknowledged beside every institutional visual.
- NASA insignia/logotype/seal are not used.
- Copy does not imply NASA endorsement of EcoPulse.
- Source-page links remain available from the visual itself.
- No selected image contains a recognizable person.
- Existing authored diagrams remain the immediate/loading/error fallback.

## Selected media

### Atmosphere limb
- EcoPulse ID: `atmosphere-limb`
- Source: NASA Earth Observatory, “Sunset from the International Space Station”
- Source page: https://science.nasa.gov/earth/earth-observatory/sunset-from-the-international-space-station-44267/
- Credit: Astronaut photograph ISS023-E-57948, ISS Crew Earth Observations / NASA-JSC; caption by William L. Stefanov, NASA-JSC.
- Use: Home hero and Atmosphere lesson.
- Delivery: NASA-hosted 1000×664 rendition; authored atmosphere diagram remains fallback.

### Easton Glacier
- EcoPulse ID: `easton-glacier`
- Source: NASA Earth Observatory, “Today’s Glacial Retreat is a Recent Phenomenon”
- Source page: https://science.nasa.gov/earth/earth-observatory/todays-glacial-retreat-is-a-recent-phenomenon-153482/
- Credit: NASA Earth Observatory image by Wanmei Liang, using Landsat data from the U.S. Geological Survey.
- Use: Glaciers lesson.
- Delivery: NASA-hosted 1253×835 Landsat view; authored glacier diagram remains fallback.

### Delaware tidal wetland habitat
- EcoPulse ID: `tidal-wetland-habitat`
- Source: NASA Earth Observatory, “Delaware’s Tidal Wetlands”
- Source page: https://science.nasa.gov/image-detail/doverdelaware-false-oli-20240903/
- Credit: NASA Earth Observatory / Michala Garrison.
- Use: Habitats lesson.
- Delivery: NASA-hosted 720×593 false-color Landsat image; authored habitat network remains fallback.
- Learner disclosure: EcoPulse explicitly states in EN/ҚАЗ that colors are enhanced to distinguish water, marsh, and vegetation and are not literal natural color.

## Vendoring gate

The preferred production state is to vendor optimized WebP/AVIF copies into `public/media/educational/` after the build environment can retrieve the verified originals. The current sandbox cannot resolve external hosts from the container (`Temporary failure in name resolution`), so Phase 26 intentionally uses the exact NASA-hosted renditions instead of fabricating or re-encoding substitutes. The content resolver keeps delivery isolated so local vendoring later does not require lesson/UI rewrites.
