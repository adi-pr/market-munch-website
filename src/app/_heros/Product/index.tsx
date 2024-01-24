import React, { Fragment } from 'react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Message } from '../../_components/Message'
import { Price } from '../../_components/Price'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    id,
    stripeProductID,
    title,
    categories,
    meta: { image: metaImage, description } = {},
  } = product

  return (
    <Fragment>
      <Gutter className={classes.productHero}>
        <div className={classes.content}>
          <div className={classes.categoryWrapper}>
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <p key={index} className={classes.category}>
                    {titleToUse}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}{' '}
                    <span className={classes.separator}>|</span>
                  </p>
                )
              }

              return null
            })}
            <p className={classes.stock}>In Stock</p>
          </div>
          <h1 className={classes.title}>{title}</h1>
          <Price product={product} button={false} />
          <div className={classes.description}>
            <p className={classes.description}>
              <h6>Description</h6>
              <p>{description}</p>
            </p>
          </div>
          <AddToCartButton product={product} className={classes.addToCartButton} />
        </div>
        <div className={classes.media}>
          <div className={classes.mediaWrapper}>
            {!metaImage && <div className={classes.placeholder}>No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              <Media imgClassName={classes.image} resource={metaImage} fill />
            )}
          </div>
          {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
            <RichText content={metaImage.caption} className={classes.caption} />
          )}
        </div>
      </Gutter>
    </Fragment>
  )
}
