
interface Area {
    name: string;
    enName: string;
    officeName: string;
    parent: string;
    children: string[];
}

export interface AreaDict {
    [key: string]: Area;
}

export interface AreaData {
    centers: AreaDict;
    offices: AreaDict;
    class10s: AreaDict;// 天気のjsonのnameと一致
    class15s: AreaDict;
    class20s: AreaDict;
}

export interface SelectedAreaInfo {
    parent: string;
    id: string;
}