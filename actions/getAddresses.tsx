import { Addresses } from "@/types";
import axios from "axios";
import { resolve } from "path";
import { auth } from "./getAuth";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
const URL = `http://localhost:3001/api/user/address`;

const getAddress = async (id: string): Promise<Addresses> => {
	const res = await axios.get(`${URL}/${id}`);
	return res.data;
};
const getAddresses = async (): Promise<Addresses> => {
	const res = await axios.get(URL);
	return res.data;
};

export { getAddresses, getAddress };
