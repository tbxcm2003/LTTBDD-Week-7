import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'; 
import axios from 'axios';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://6707bf128e86a8d9e42cbee0.mockapi.io/todo')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.checkboxContainer}>
        <Text style={styles.tick}>✓</Text>  
      </View>
      <Text style={styles.todoText}>{item.todo}</Text> 
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>✏️</Text>
      </TouchableOpacity>
    </View> 
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Text>{'<--'}</Text> 
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }} 
          style={styles.avatar}
        />
        <View>
          <Text style={styles.header}>Hi Twinkle</Text>
          <Text style={styles.subHeader}>Have a great day ahead</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={text => setSearch(text)}
      />

      <FlatList
        data={todos.filter(item => item.todo && item.todo.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 16,
    color: '#888',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tick: {
    fontSize: 16,
    color: '#00aaff', 
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  editButton: {
    padding: 5,
  },
  editText: {
    fontSize: 18,
    color: '#f39c12',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    marginLeft: -30, 
    backgroundColor: '#00aaff',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 27,
    color: '#fff',
  },
});

export default TodoScreen;
