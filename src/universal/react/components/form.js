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

export default connect()(React.createClass({
    onClick(e) {
        // trace the element which triggered a submit
        this.lastClick = e.target;
    },
	onSubmit(e) {
		// dumb form serialization
		e.preventDefault();
		const url = this.lastClick.getAttribute('formaction') || e.target.action;
		const body = serialize(e.target);
        const action = POST({url, body});
		this.props.dispatch(action);
	},
	render() {
		const { props, onSubmit, onClick } = this;

		return (<form 
			className={props.className}
			action={props.action}
			autoComplete={props.autocomplete}
			encType={props.enctype}
			method={props.method}
			name={props.name}
			noValidate={props.novalidate}
			target={props.target}
			onSubmit={onSubmit}
            onClick={onClick}
		>{props.children}</form>);

	}
}));