/**
 * Requisite polyfill for `requestAnimationFrame`
 * @see {@link https://reactjs.org/docs/javascript-environment-requirements.html}
 */
import 'raf/polyfill'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
