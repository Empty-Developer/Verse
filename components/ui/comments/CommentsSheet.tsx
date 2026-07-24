import { StyleSheet, Text, View } from 'react-native'
import React, { RefObject, useRef } from 'react'
import BottomSheet, { BottomSheetMethod } from '../bottom-sheet/BottomSheet'
import CommentList from './CommentList'
import CommentInput from './CommentInput'

type Props = {
    bottomSheetRef: React.RefObject<BottomSheetMethod | null>;
}

export default function CommentsSheet({
  bottomSheetRef
}: Props) {

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapTo="92%"
      backgroundColor="white"
      backDropColor="rgba(0,0,0,0.5)"
    >
      <CommentList />
      <CommentInput/>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({})