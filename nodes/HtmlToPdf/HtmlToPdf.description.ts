import { INodeTypeDescription } from 'n8n-workflow';

export const description: INodeTypeDescription = {
  displayName: 'HTML to PDF - GS',
  name: 'htmlToPdfPP',
  icon: 'file:icons/htmlToPdf.png',
  group: ['transform'],
  version: 1,
  description: 'Convierte HTML a PDF',
  defaults: {
    name: 'HTML to PDF - GS',
  },
  inputs: ['main'],
  outputs: ['main'],
  properties: [
    {
      displayName: 'Input Type',
      name: 'inputType',
      type: 'options',
      options: [
        {
          name: 'HTML String',
          value: 'string',
        },
        {
          name: 'Binary Data',
          value: 'binary',
        },
      ],
      default: 'string',
      description: 'Tipo de entrada para convertir en PDF',
    },
    {
      displayName: 'HTML String',
      name: 'htmlString',
      type: 'string',
      default: '',
      displayOptions: {
        show: {
          inputType: ['string'],
        },
      },
      description: 'Cadena HTML para convertir a PDF',
    },
    {
      displayName: 'Binary Property',
      name: 'binaryPropertyName',
      type: 'string',
      default: 'data',
      displayOptions: {
        show: {
          inputType: ['binary'],
        },
      },
      description: 'Nombre de la propiedad binaria que contiene el archivo HTML',
    },
  ],
};