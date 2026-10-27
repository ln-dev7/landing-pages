import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const source = fs.readFileSync(
  new URL("../lib/journey.ts", import.meta.url),
  "utf8",
);
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { cameraAt, chapters, smooth, archPoint, doorProfile } = await import(
  `data:text/javascript;base64,${Buffer.from(js).toString("base64")}`
);
test("the camera always travels forward and stays continuous across rooms", () => {
  let previous = cameraAt(0);
  for (let step = 1; step <= 10000; step++) {
    const pose = cameraAt(step / 10000);
    assert.ok(pose.every(Number.isFinite));
    assert.ok(pose[2] <= previous[2] + 1e-8);
    assert.ok(
      Math.max(...pose.map((n, i) => Math.abs(n - previous[i]))) < 0.025,
    );
    previous = pose;
  }
  assert.equal(previous[2], -52);
});
test("every chapter maps to a valid camera position, including both ends", () => {
  assert.equal(chapters[0].progress, 0);
  assert.equal(chapters.at(-1).progress, 1);
  for (const c of chapters) assert.equal(cameraAt(c.progress).length, 6);
  assert.deepEqual(cameraAt(-1), cameraAt(0));
  assert.deepEqual(cameraAt(2), cameraAt(1));
});
test("doors open before the camera reaches them, without discontinuities", () => {
  assert.equal(smooth(10, 2, 11), 0);
  assert.equal(smooth(10, 2, 1), 1);
  assert.equal(smooth(10, 2, 6), 0.5);
});

test("door leaves clear the fixed transom and fanlight", () => {
  assert.ok(doorProfile.leafTop < doorProfile.transomBottom);
  assert.ok(doorProfile.leafTop < doorProfile.spring);
  const points = Array.from({ length: 1001 }, (_, i) =>
    archPoint(4.2, 6.4, i / 1000),
  );
  for (const [x, y] of points) {
    assert.ok(Math.abs(x) <= 2.10001);
    assert.ok(y >= -1e-8 && y <= 6.40001);
  }
  assert.ok(Math.abs(points[500][0]) < 1e-8);
  assert.equal(points[500][1], 6.4);
  for (let i = 1; i < points.length; i++)
    assert.ok(
      Math.hypot(
        points[i][0] - points[i - 1][0],
        points[i][1] - points[i - 1][1],
      ) < 0.016,
    );
});
