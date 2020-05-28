import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
describe("voting contract test suite", () => {
  let voterClient: Client;
  let provider: Provider;
  before(async () => {
    provider = await ProviderRegistry.createProvider();
   voterClient = new Client("STBVZ2VWVMCP1GQWSACQ1MVH5Z7CYMAC9H7NVQW9.voting", "voting", provider);
  });
  it("should have a valid syntax", async () => {
    await voterClient.checkContract();
  });
  describe("deploying an instance of the contract", () => {
    const getCounter = async () => {
      const query =voterClient.createQuery({
        method: { name: "check-vote", args: [] }
      });
      const receipt = await voterClient.submitQuery(query);
      const result = Result.unwrapInt(receipt);
      return result;
    }
    const execMethod = async (method: string) => {
      const tx =voterClient.createTransaction({
        method: {
          name: method,
          args: [],
        },
      });
      await tx.sign("STBVZ2VWVMCP1GQWSACQ1MVH5Z7CYMAC9H7NVQW9");
      const receipt = await voterClient.submitTransaction(tx);
      return receipt;
    }
    before(async () => {
      await voterClient.deployContract();
    });
    it("should start at zero", async () => {
      const vote-count = await get-vote();
      assert.equal(vote-count, 0);
    })
    it("should increase votecount", async () => {
      await execMethod("vote");
      assert.equal(await get-vote(), 1);
      await execMethod("vote");
      assert.equal(await get-vote(), 2);
    });
  after(async () => {
    await provider.close();
  });
});
