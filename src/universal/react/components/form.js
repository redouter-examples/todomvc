// this is a redux-specific component
import React from 'react';
import * as routeAction from 'route-action';
import { connect } from 'react-redux';

const { helpers: { POST } } = routeAction;

// simple serializer adapted from SO somewhere....
function serialize(form) {
    var obj = {}, field;
  
    function add(key, value) {
      if (obj[key] === undefined) {
        obj[key] = value;
      } else if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key],value];
      }
    }
    
    if (typeof form === 'object' && form.nodeName === "FORM") {
        let len = form.elements.length;
        let i, j;
        for (i=0; i<len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {
                if (field.type === 'select-multiple') {
                    for (j=form.elements[i].options.length-1; j>=0; j--) {
                        if(field.options[j].selected) {
                          add(field.name, field.options[j].value);
                        }   
                    }
                } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                    add(field.name, field.value);
                }
            }
        }
    }
    return obj;
}

// TODO: The props from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form should be inherited
export default connect()(React.createClass({
	onSubmit(e) {
		// dumb form serialization
		e.preventDefault();
		const url = e.target.action;
		const body = serialize(e.target);
		this.props.dispatch(POST({ url, body }));
	},
	render() {
		const { props, onSubmit } = this;

		return (<form 
			className={props.className}
			action={props.action}
			autocomplete={props.autocomplete}
			enctype={props.enctype}
			method={props.method}
			name={props.name}
			novalidate={props.novalidate}
			target={props.target}
			onSubmit={onSubmit}
		>{props.children}</form>);

	}
}));