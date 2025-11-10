export interface CommonNodeData {
  title: string,
  nodeColor: string,
  block:[
    {
      type:string
      , data:string
    }
  ],
}

export interface CommonNodeEvents {}

export interface LLMNodeData {
  title: string,
  textarea: string,
}

export interface LLMNodeEvents {}
