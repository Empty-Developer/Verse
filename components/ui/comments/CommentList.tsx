import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCommentStore } from '@/stores/useCommentStore'
import CommentItem from './CommentItem'
import EmptyComments from './EmptyComments'

export default function CommentList() {
  const comments = useCommentStore(
    state => state.comments
  )

  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CommentItem comment={item} />
      )}
      ListEmptyComponent={<EmptyComments />}
    />
  )
}

const styles = StyleSheet.create({})