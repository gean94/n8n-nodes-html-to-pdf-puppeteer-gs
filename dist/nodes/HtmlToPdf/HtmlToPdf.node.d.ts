import { IExecuteFunctions, INodeExecutionData, INodeType } from 'n8n-workflow';
export declare class HtmlToPdf implements INodeType {
    description: import("n8n-workflow").INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
