# PolyStack
Polystack is the library which extends LitElement to provide API's like:-

- methods
- mixins
- eventbus

## Requirements
``` bash
lit-elment
```

## Install
``` bash
npm i polystack
```
## Blogs
[Separate polymer component and its actions using polystack](https://www.sagaryonjan.com.np/2020/03/27/separate-polymer-component-and-its-actions-using-polystack/)


## Demo
https://github.com/sagaryonjan/polystack-demo


## Seprate method with component.

Let create `MessageComponent` and extend `LitElementWrapper`. 

``` bash
import {LitElementWrapper} from 'polystack';
import { css } from 'lit-element';

class MessageComponent extends LitElementWrapper {

    static get properties() {
      return { 
        message: { type: String },
        message_show: {type: Boolean }
      };
    }

    render() {
      return html`
          <a href="javascript:void(0)" @click=${this.showMessage}></a>
          ${this.message_show?html`<p>${this.message}</p>`:'No Message'}
      `;
    }
  }
  
  customElements.define('message-component', MessageComponent);
```

Now let's create separate file where we will define all the methods for this component. file name `MessageActions.js`.
``` bash

export const showMessage = ({setState}) => {
    setState('message_show', true);
}

```

Import action file in message component. 
```bash
import  * as actions from './MessageActions' 
```

and register methods inside object : 
```bash
 methods() {
    return actions;
 }
```

## Mixins

We can register mixins like this: 
```bash
 mixins() {
    return [
      errorMixin
    ]
  }
```

Error mixin file : 
```bash
export const data = {
    error : {
        status: false,
        message: ''
    }
}

export const onClickShowError = ({setState}) => {
    setState('error', {
        status: true,
        message: 'Invalid Request !'
    }, true);
}

export const onClickHideError = ({setState}) => {
    setState('error', {
        status: false,
        message: 'Message Success'
    }, true);
}
```
After we add this method in mixin we can access it in our own object.


## Lit Element Wrapper 

### Mixins

Every data or methods shared in this mixin array can be accessible from this object.
```bash
  mixins() {
    return [];
  }
```

Every methods register in this object will be accessible from this object.
```bash
methods() {
  return {};
}
```

```bash
 <input type="text" @input="${(e) => this.model('fullName', e, true)}">
```
This will automatically update fullName of the object.

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
