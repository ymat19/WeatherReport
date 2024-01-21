import { Td, Tr } from "@chakra-ui/react";
import { AreaDict } from "../AreaData";
import { SetStateAction } from "react";

type Props = {
  areaDict: AreaDict | null;
  setId: React.Dispatch<SetStateAction<string>>;
};

const rowItemNum = 3;

export const AreaTable = ({ areaDict, setId: setId }: Props) => {
  if (!areaDict) return;
  const areaEntries = Object.entries(areaDict);
  const splitedAreaEntries = areaEntries
    .map(
      (_, index) =>
        index % rowItemNum == 0 && areaEntries.slice(index, index + rowItemNum)
    )
    .filter((item) => item);

  return splitedAreaEntries.map((entries, index) => {
    return (
      <Tr key={index}>
        {entries &&
          entries.map(([key, value], index) => (
            <Td key={index} onClick={() => setId(key)}>
              {value.name}
            </Td>
          ))}
      </Tr>
    );
  });
};
