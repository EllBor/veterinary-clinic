import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const PDFDocumentHistory = ({ pet, history }) => {
    return ( 
        <Document>
        <Page size="A4">
          <View style={styles.section}>
            <Text>Медицинская карта питомца: {pet.name}</Text>
            <Text>Вид: {pet.species}</Text>
            <Text>Порода: {pet.breed}</Text>
            <Text>Пол: {pet.gender}</Text>
            <Text>Возраст: {pet.age}</Text>
            <Text>Медицинская история:</Text>
            {history.prescriptions.map((prescription, index) => (
              <View key={index}>
                <Text>Лекарство: {prescription.medication}</Text>
                <Text>Дозировка: {prescription.dosage}</Text>
                <Text>Частота: {prescription.frequency}</Text>
                <Text>Начальная дата: {prescription.startDate}</Text>
                <Text>Конечная дата: {prescription.endDate}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
     );
}
 
const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
});

export default PDFDocumentHistory;