interface Place {
    choosedState: string;
    setState: (state: string) => void;
    // other properties returned by usePlace
}

interface PlaceProviderPropsT {
}

interface FormSelectFetch {
    data: Array<any>;
    name: string;
    onChange?: (e: any) => void;
}

interface FormInput {
    id?: string;
    placeholder: string;
    type?: string;
    name?: string;
}
export type { 
    Place,
    PlaceProviderPropsT,
    FormSelectFetch,
    FormInput
}