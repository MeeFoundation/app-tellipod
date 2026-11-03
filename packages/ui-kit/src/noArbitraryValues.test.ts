import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// A Tailwind class with a literal in square brackets, such as `bg-[#1a2b3c]` or `p-[13px]`.
const ARBITRARY_VALUE =
  /(?<![\w\]])(?:[a-z0-9-]+:)*-?[a-z]+(?:-[a-z0-9]+)*-\[[^\]\s]+\]/g;

const isKitSource = (path: string) =>
  /\.(ts|tsx)$/.test(path) && !/\.test\.(ts|tsx)$/.test(path);

const listFiles = (dir: string): readonly string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });

const findArbitraryValues = (source: string): readonly string[] =>
  source.match(ARBITRARY_VALUE) ?? [];

describe("kit sources", () => {
  it("find arbitrary-value classes in a sample", () => {
    expect(findArbitraryValues('className="bg-[#1a2b3c]"')).toEqual([
      "bg-[#1a2b3c]",
    ]);
    expect(
      findArbitraryValues('className="p-[13px] active:bg-[#fff]"'),
    ).toEqual(["p-[13px]", "active:bg-[#fff]"]);
    expect(
      findArbitraryValues('className="bg-surface-brand-solid p-3"'),
    ).toEqual([]);
    expect(findArbitraryValues("const first = items[0];")).toEqual([]);
  });

  it("use no arbitrary-value classes", () => {
    const roots = [join(__dirname), join(__dirname, "..", "tailwind")];
    const offenders = roots
      .flatMap(listFiles)
      .filter(isKitSource)
      .flatMap((path) =>
        findArbitraryValues(readFileSync(path, "utf8")).map(
          (match) => `${path}: ${match}`,
        ),
      );
    expect(offenders).toEqual([]);
  });
});
