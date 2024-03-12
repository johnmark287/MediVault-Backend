import { Request, Response } from "express";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory } from "./../declarations/api";

const test = async (req: Request, res: Response) => {
  try {
    const getTest = async () => {
      const agent = new HttpAgent({
        host: "http://127.0.0.1:4943",
        verifyQuerySignatures: false,
      });
      const testActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"),
      });
      const str = await testActor.test();
      return str;
    };
    const testString = await getTest();
    return res.status(200).json({ testString: testString });
  } catch (error) {
    return res.status(404).json({ notFound: "Server Error" });
  }
};

export default test;