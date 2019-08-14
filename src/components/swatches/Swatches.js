import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import map from 'lodash/map'
import merge from 'lodash/merge'
import color from '../../helpers/color'

import { ColorWrap, Raised } from '../common'
import SwatchesGroup from './SwatchesGroup'

export const Swatches = ({ width, height, onChange, onSwatchHover, colors, hex,
  styles: passedStyles = {}, className = '' }) => {
  const styles = reactCSS(merge({
    'default': {
      picker: {
        width,
        height,
      },
      overflow: {
        height,
        overflowY: 'scroll',
      },
      body: {
        padding: '16px 0 6px 16px',
      },
      clear: {
        clear: 'both',
      },
    },
  }, passedStyles))

  const handleChange = (data, e) => {
    color.isValidHex(data) && onChange({
      hex: data,
      source: 'hex',
    }, e)
  }

  return (
    <div style={ styles.picker } className={ `swatches-picker ${ className }` }>
      <Raised>
        <div style={ styles.overflow }>
          <div style={ styles.body }>
            { map(colors, group => (
              <SwatchesGroup
                key={ group.toString() }
                group={ group }
                active={ hex }
                onClick={ handleChange }
                onSwatchHover={ onSwatchHover }
              />
            )) }
            <div style={ styles.clear } />
          </div>
        </div>
      </Raised>
    </div>
  )
}

Swatches.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  styles: PropTypes.object,
}

/* eslint-disable max-len */
Swatches.defaultProps = {
  width: 320,
  height: 240,
  colors: [
    ['#000000', '#525252', '#969696', '#D9D9D9', '#FFFFFF'],
  ],
  styles: {},
}

export default ColorWrap(Swatches)
