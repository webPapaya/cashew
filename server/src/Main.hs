{-# LANGUAGE OverloadedStrings #-}
import Web.Scotty

doubleMe :: Integer -> Integer
doubleMe x = x * 2


main = scotty 3000 $ do
  get "/" $ do
    html "Hello World!"

  notFound $ do
    html "404 not found!"
