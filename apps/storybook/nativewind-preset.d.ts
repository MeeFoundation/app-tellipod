// nativewind/preset ships its types as a script, not a module.
declare module "nativewind/preset" {
  import type { Config } from "tailwindcss";

  const preset: Config;
  export default preset;
}
