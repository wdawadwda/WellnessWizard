export type ActionCreatorWithPayload<TPayload> = (payload: TPayload) => { payload: TPayload; type: string };
