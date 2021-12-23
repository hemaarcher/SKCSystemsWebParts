import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SkcsystemdeplistWebPartStrings';
import Skcsystemdeplist from './components/Skcsystemdeplist';
import { ISkcsystemdeplistProps } from './components/ISkcsystemdeplistProps';

export interface ISkcsystemdeplistWebPartProps {
  description: string;
}

export default class SkcsystemdeplistWebPart extends BaseClientSideWebPart<ISkcsystemdeplistWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISkcsystemdeplistProps> = React.createElement(
      Skcsystemdeplist,
      {
        description: this.properties.description,
        spcontext:this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
