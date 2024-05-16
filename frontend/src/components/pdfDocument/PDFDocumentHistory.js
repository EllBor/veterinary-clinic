import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import FontInterRegular from '../../fonts/Inter-Regular.otf';
Font.register({ family: 'Inter', src: FontInterRegular });

const PDFDocumentHistory = ({ pet, historyPrescriptions, historyDiagnosis }) => {
    return ( 
        <Document>
        <Page size="A4">
          <View style={styles.section}>
            <Text style={styles.text}>Медицинская карта питомца: {pet.name}</Text>
            <Text style={styles.text}>Вид: {pet.species}</Text>
            <Text style={styles.text}>Порода: {pet.breed}</Text>
            <Text style={styles.text}>Пол: {pet.gender}</Text>
            <Text style={styles.text}>Возраст: {pet.age}</Text>
            <Text style={styles.text}>Медицинская история: {historyDiagnosis}</Text>
            {historyPrescriptions.map((prescription, index) => (
              <View key={index}>
                <Text style={styles.text}>---------------------------------------------------------------</Text>
                <Text style={styles.text}>Лекарство: {prescription.medication}</Text>
                <Text style={styles.text}>Дозировка: {prescription.dosage}</Text>
                <Text style={styles.text}>Частота: {prescription.frequency}</Text>
                <Text style={styles.text}>Начальная дата: {new Date(prescription.startDate).toLocaleDateString()}</Text>
                <Text style={styles.text}>Конечная дата: {new Date(prescription.endDate).toLocaleDateString()}</Text>
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
    },
    text: {
      fontFamily: 'Inter',
    }
});

export default PDFDocumentHistory;