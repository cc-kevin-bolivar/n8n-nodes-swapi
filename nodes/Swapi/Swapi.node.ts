import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import nodeDescription from './Swapi.node.json';

export class Swapi implements INodeType {

	// 👈 agregar esta propiedad
	icon = 'file:example.svg';

	description: INodeTypeDescription = nodeDescription as unknown as INodeTypeDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			if (resource === 'people' && operation === 'getPerson') {
				const personId = this.getNodeParameter('personId', i) as number;

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: `https://swapi.dev/api/people/${personId}/`,
					json: true,
				});

				returnData.push({ json: response });
			}
		}

		return [returnData];
	}
}
