
import { shallow } from 'enzyme';
import React from 'react';
import Header from './Header';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

let props = {
    title: "Add Data",
    buttonName: 'Add',
    pathName: 'Home'
}

beforeEach(() => {
    wrapper = shallow(<Header {...props} />)
})

describe("<Header/>", () => {
    it("Create a SnapSort", () => {
        expect(wrapper).toMatchSnapshot();
    })

    it("Check Header component", () => {
        const firstElement = wrapper.find('div').first();
        expect(firstElement.prop('className')).toEqual('addpage');
    })

    describe("check header component props", () => {
        it("check Title value", () => {
            const titleValue = wrapper.find('.addtext');
            expect(titleValue.text()).toBe(props.title)
        })

        it("check Button value", () => {
            const buttonName = wrapper.find('.btn-add');
            expect(buttonName.text()).toBe(props.buttonName)
        })

        it("check NavLink Path", () => {
            const NavLinks = wrapper.find('NavLink');
            expect(NavLinks.props().to).toBe(props.pathName)
        })
    })
})