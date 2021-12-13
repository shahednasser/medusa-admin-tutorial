import React, { useState } from "react"
import { Link } from "gatsby"
import _ from "lodash"
import { Flex, Text, Box, Image } from "rebass"

import ImagePlaceholder from "../../assets/svg/image-placeholder.svg"

import Spinner from "../../components/spinner"
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableHeaderRow,
  TableBody,
  TableRow,
  TableDataCell,
  DefaultCellContent,
} from "../../components/table"

import useMedusa from "../../hooks/use-medusa"
import styled from "@emotion/styled"

const LinkWrapper = styled(Link)`
  width: 100%;
  height: 100%;

  text-decoration: none;
  color: black;

  > div {
    color: blue;
  }

  &:focus {
    outline: none;
  }
  display: flex;
`

const TopSelling = () => {

  const {
    products,
    hasCache,
    isLoading,
    isReloading,
  } = useMedusa("topSelling")

  return (
    <Flex flexDirection="column" pb={5} pt={5}>
      <Flex>
        <Text mb={3} fontSize={20} fontWeight="bold">
          Top Selling Products
        </Text>
      </Flex>
      {(isLoading && !hasCache) || isReloading ? (
        <Flex
          flexDirection="column"
          alignItems="center"
          height="100vh"
          mt="20%"
        >
          <Box height="50px" width="50px">
            <Spinner dark />
          </Box>
        </Flex>
      ) : (
        <Table>
          <TableHead>
            <TableHeaderRow>
              <TableHeaderCell sx={{ maxWidth: "75px" }} />
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Number of Sales</TableHeaderCell>
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {products.map(p => {

              return (
                <TableRow key={p.id}>
                  <LinkWrapper
                    to={`/a/products${p.is_giftcard ? "/gift-card" : ""}/${
                      p.id
                    }`}
                  >
                    <TableDataCell
                      maxWidth="75px"
                      p={2}
                      height="100%"
                      textAlign="center"
                    >
                      <DefaultCellContent>
                        <Image
                          src={p.thumbnail || ImagePlaceholder}
                          height={38}
                          width={38}
                          p={!p.thumbnail && "8px"}
                          sx={{
                            objectFit: "contain",
                            border: "1px solid #f1f3f5",
                          }}
                        />
                      </DefaultCellContent>
                    </TableDataCell>
                    <TableDataCell>
                      <DefaultCellContent>{p.title}</DefaultCellContent>
                    </TableDataCell>
                    <TableDataCell>
                      <DefaultCellContent>
                        {p.metadata.sales}
                      </DefaultCellContent>
                    </TableDataCell>
                  </LinkWrapper>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </Flex>
  )
}

export default TopSelling
