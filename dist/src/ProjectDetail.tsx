import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, FileCode, TestTube, Rocket } from "lucide-react";

const projectData: Record<string, any> = {
  "erc20-ico": {
    title: "ERC20 Token + ICO",
    description: "A comprehensive implementation of an ERC20 token with a full-featured Initial Coin Offering (ICO) contract. This project demonstrates tokenomics design, crowdsale mechanics, and secure token distribution.",
    tags: ["Solidity", "ERC20", "Crowdsale", "Foundry", "OpenZeppelin"],
    features: [
      "Custom ERC20 token with mintable and burnable functionality",
      "ICO contract with multiple funding rounds and bonuses",
      "Whitelist and KYC integration for compliant token sales",
      "Automated token vesting schedule for team and advisors",
      "Emergency pause and upgradeable contract patterns",
    ],
    techStack: "Built with Solidity 0.8.x, using Foundry for development and testing. Leverages OpenZeppelin contracts for security-audited implementations.",
    learned: "Gained deep understanding of token standards, crowdsale mechanics, access control patterns, and gas optimization techniques. Implemented comprehensive test coverage with edge case handling.",
    architecture: "The system consists of a main Token contract (ERC20) and a Crowdsale contract that handles the ICO logic. Investors send ETH to the crowdsale contract which mints tokens based on the current rate and bonus structure.",
  },
  "nft-collection": {
    title: "NFT Collection",
    description: "Full-featured ERC721 NFT collection with on-chain and off-chain metadata, IPFS integration, and marketplace compatibility. Includes minting mechanics, royalty standards, and provenance tracking.",
    tags: ["ERC721", "IPFS", "OpenZeppelin", "Metadata", "NFT"],
    features: [
      "ERC721 standard implementation with enumerable extension",
      "Metadata stored on IPFS with Pinata integration",
      "Royalty standard (EIP-2981) for creator earnings",
      "Whitelist minting and public sale phases",
      "Reveal mechanism for mystery box drops",
    ],
    techStack: "Solidity smart contracts deployed on Ethereum testnet, metadata hosted on IPFS, frontend built with React and ethers.js for Web3 integration.",
    learned: "Mastered NFT standards, IPFS pinning strategies, royalty implementations, and gas-efficient batch minting. Learned marketplace integration and metadata standards.",
    architecture: "Smart contract handles minting and ownership, while metadata URIs point to IPFS CIDs. The reveal mechanism uses a base URI swap to transition from placeholder to final artwork.",
  },
  "vrf-raffle": {
    title: "VRF Raffle System",
    description: "Provably fair lottery system using Chainlink VRF (Verifiable Random Function) for secure and transparent randomness. Features automated winner selection and prize distribution.",
    tags: ["Chainlink VRF", "Randomness", "Automation", "Events", "Oracle"],
    features: [
      "Chainlink VRF integration for verifiable randomness",
      "Multiple entry tiers and pricing options",
      "Automated winner selection via Chainlink Keepers",
      "Prize pool distribution with configurable splits",
      "Event emission for transparent raffle history",
    ],
    techStack: "Solidity contracts integrated with Chainlink VRF v2 and Chainlink Automation. Deployed on Sepolia testnet with frontend monitoring dashboard.",
    learned: "Understood oracle networks, VRF request-response patterns, subscription management, and automated contract execution. Implemented secure randomness without central authority.",
    architecture: "Users enter raffle by sending ETH. When raffle closes, Chainlink Keeper triggers VRF request. VRF Coordinator returns random number, which selects winner. Prize automatically transfers to winner's address.",
  },
  "voting-contract": {
    title: "On-Chain Voting System",
    description: "Democratic voting contract with proposal creation, vote delegation, and transparent tallying. Implements quadratic voting and time-locked execution.",
    tags: ["Governance", "Voting", "Proposals", "Democracy", "DAO"],
    features: [
      "Create and submit proposals with descriptions",
      "Token-weighted voting mechanism",
      "Vote delegation to trusted addresses",
      "Quadratic voting option to prevent plutocracy",
      "Time-lock execution for passed proposals",
    ],
    techStack: "Solidity smart contracts with OpenZeppelin Governor standard, deployed with Foundry. Integrates with governance tokens for voting power.",
    learned: "Studied governance patterns, voting mechanisms (simple, weighted, quadratic), time-lock safety measures, and proposal lifecycle management.",
    architecture: "Governance token holders create proposals. During voting period, holders vote Yes/No/Abstain. After quorum reached and time-lock expired, proposal execution can be triggered by anyone.",
  },
  "simple-dao": {
    title: "Simple DAO",
    description: "Decentralized Autonomous Organization with treasury management, member governance, and proposal execution. Features multi-signature approvals and fund allocation.",
    tags: ["DAO", "Governance", "Treasury", "Multi-sig", "Finance"],
    features: [
      "Membership system with voting shares",
      "Treasury contract for fund management",
      "Multi-signature proposal approval",
      "Automated fund distribution on passed proposals",
      "Member contribution tracking and rewards",
    ],
    techStack: "Solidity contracts for DAO logic and treasury, Foundry for testing, and a React dashboard for member interaction and proposal monitoring.",
    learned: "Explored DAO design patterns, multi-sig security, treasury management, member incentive alignment, and on-chain governance best practices.",
    architecture: "Members hold governance tokens. Proposals require majority approval. Treasury contract holds funds and releases them only when proposals pass. Multi-sig ensures no single point of failure.",
  },
  "no-loss-lottery": {
    title: "No-Loss Lottery (Aave)",
    description: "DeFi lottery where users deposit funds into a pool that generates yield via Aave. One random winner receives all accumulated interest while everyone gets their principal back.",
    tags: ["Aave", "DeFi", "Yield", "Pool Together", "Finance"],
    features: [
      "Deposit pooling with instant entry tickets",
      "Aave integration for yield generation",
      "Chainlink VRF for winner selection",
      "Automated yield distribution to winner",
      "Full principal withdrawal anytime",
    ],
    techStack: "Solidity contracts interacting with Aave v3 lending protocol, Chainlink VRF for randomness, deployed on Polygon for low fees.",
    learned: "Gained experience with DeFi composability, Aave lending pools, yield strategies, interest accrual calculations, and building on existing protocols.",
    architecture: "Users deposit DAI into lottery contract. Contract deposits DAI into Aave, earning aDAI. Interest accrues over time. At draw time, VRF selects winner who receives all accrued interest. All users can withdraw original deposits.",
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">Project Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-foreground mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag: string) => (
                <Badge key={tag} className="bg-primary/10 text-primary border-primary/30">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2">
                <Github className="w-4 h-4" />
                View Repository
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
              <Button variant="outline" className="gap-2">
                <FileCode className="w-4 h-4" />
                View on Etherscan
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Live UI Demo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Interactive demonstration of the project's user interface and functionality.
                  </p>
                  <div className="bg-gradient-card border border-primary/30 rounded-lg overflow-hidden shadow-elevation">
                    <div className="aspect-video bg-code-bg flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <ExternalLink className="w-12 h-12 text-primary mx-auto" />
                        <p className="text-muted-foreground">
                          Live demo interface will be embedded here
                        </p>
                        <Button className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Open Full Demo
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-card/50 border-t border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        💡 Try interacting with the smart contract, view transactions, and explore the DApp functionality
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Tech Stack & Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.techStack}</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5" />
                  Architecture & Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.architecture}</p>
                <div className="bg-code-bg p-6 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground font-mono">
                    [Architecture Diagram Placeholder]
                    <br />
                    Visual workflow showing contract interactions, user flows, and data flow
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>What I Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.learned}</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Smart Contract & Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Contract Files</h4>
                  <div className="bg-code-bg p-4 rounded border border-border overflow-x-auto">
                    <code className="text-sm text-muted-foreground font-mono whitespace-nowrap block">
                      src/Contract.sol<br />
                      src/interfaces/IContract.sol<br />
                      src/libraries/ContractLib.sol
                    </code>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Test Coverage</h4>
                  <div className="bg-code-bg p-4 rounded border border-border overflow-x-auto">
                    <code className="text-sm text-muted-foreground font-mono whitespace-nowrap block">
                      test/Contract.t.sol<br />
                      test/integration/ContractIntegration.t.sol<br />
                      test/fuzz/ContractFuzz.t.sol
                    </code>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Deployment Scripts</h4>
                  <div className="bg-code-bg p-4 rounded border border-border overflow-x-auto">
                    <code className="text-sm text-muted-foreground font-mono whitespace-nowrap block">
                      script/Deploy.s.sol<br />
                      script/Verify.s.sol
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;