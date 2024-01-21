import { Table, TableCaption, TableContainer, Tbody } from "@chakra-ui/react";
import { AreaData, AreaDict, SelectedAreaInfo } from "../AreaData";
import { AreaTable } from "./AreaTable";
import { SetStateAction, useEffect, useState } from "react";

type Props = {
  areaData: AreaData | null;
  setSelectedArea: React.Dispatch<SetStateAction<SelectedAreaInfo | null>>;
};

const getAreaDict = (areaData: AreaData | null, id: string) => {
  if (!areaData) return null;

  const checkId = (dict: AreaDict) => Object.keys(dict).includes(id);

  if (!id) return areaData.centers;
  else if (checkId(areaData.centers)) return areaData.offices;
  else if (checkId(areaData.offices)) return areaData.class10s;
  //else if (checkId(areaData.class10s)) return areaData.class15s;
  //else if (checkId(areaData.class15s)) return areaData.class20s;
  else return null;
};

export const SelectArea = ({
  areaData,
  setSelectedArea: setSelectedId,
}: Props) => {
  const [currentId, setCurrentId] = useState("");
  const [currentDict, setCurrentDict] = useState<AreaDict | null>(null);

  useEffect(() => {
    if (!areaData) return;
    const areaDict = getAreaDict(areaData, currentId);
    if (!areaDict) {
      currentDict &&
        setSelectedId({ parent: currentDict[currentId].parent, id: currentId });
      return;
    }
    const nextDict = Object.fromEntries(
      Object.entries(areaDict).filter(
        ([, value]) => !currentId || value.parent == currentId
      )
    );
    if (Object.keys(nextDict).length == 1) {
      currentDict && setSelectedId({ parent: currentId, id: currentId });
      return;
    }
    setCurrentDict(nextDict);
  }, [currentId, areaData, setSelectedId]);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption> どこ住み？</TableCaption>
        <Tbody>
          <AreaTable areaDict={currentDict} setId={setCurrentId} />
        </Tbody>
      </Table>
    </TableContainer>
  );
};
