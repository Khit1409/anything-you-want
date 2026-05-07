import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export function getIconByString(name: string): IconDefinition | undefined {
  const key = `fa${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  return (solidIcons as Record<string, unknown>)[key] as
    | IconDefinition
    | undefined;
}
