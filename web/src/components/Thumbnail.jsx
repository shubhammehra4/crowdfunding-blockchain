import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Thumbnail({ file }) {
  const [thumb, setThumb] = useState(undefined);

  useEffect(() => {
    if (!file) return;

    let reader = new FileReader();
    reader.onloadend = () => setThumb(reader.result);
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <Image
      borderRadius="full"
      src={thumb}
      boxSize="28"
      alt={file?.name ?? "Logo"}
      fallbackSrc="/fallback.jpg"
    />
  );
}
