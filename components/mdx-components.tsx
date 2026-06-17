import Image from "next/image";
import type { ComponentProps } from "react";

type ImgProps = ComponentProps<"img">;

export const mdxComponents = {
  img: (props: ImgProps) => (
    <span className="my-6 block">
      <Image
        src={typeof props.src === "string" ? props.src : ""}
        alt={props.alt || ""}
        width={800}
        height={450}
        className="w-full border border-border"
      />
    </span>
  ),
};
