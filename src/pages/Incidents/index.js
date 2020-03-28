import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState({
    list: [],
    count: 0
  });
  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    try {
      const response = await api.get("/incidents");

      if (response.data) {
        setIncidents({
          list: response.data,
          count: response.headers["x-total-count"]
        });
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de{" "}
          <Text style={styles.headerTextBold}>{incidents.count} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia
      </Text>

      <FlatList
        style={styles.incidentsList}
        showsVerticalScrollIndicator={false}
        keyExtractor={incident => String(incident.id)}
        data={incidents.list}
        renderItem={({ item }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{item.name}</Text>

            <Text style={styles.incidentProperty}>CASO: {item.title} </Text>
            <Text style={styles.incidentValue}>{item.description}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(item.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(item)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
