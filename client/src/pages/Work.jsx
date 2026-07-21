import { useState } from "react";
import { Shield, Lock, Globe, FileText, Image, Check } from "lucide-react";

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Shield,
      title: "Wallet Authentication",
      subtitle: "Cryptographic identity verification",
      description:
        "Users connect through MetaMask. The wallet account becomes the owner identity used to store and retrieve image records.",
      tech: ["ECDSA signatures", "Wallet connection", "Account ownership"],
      metrics: { protocol: "secp256k1", access: "Wallet based" },
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      subtitle: "Data is protected before storage",
      description:
        "Images are encrypted before upload so storage providers do not receive plaintext image content.",
      tech: ["AES-256", "Client-side processing", "Private access"],
      metrics: { standard: "AES-256", exposure: "No plaintext" },
    },
    {
      icon: Globe,
      title: "Decentralized Storage",
      subtitle: "Encrypted content on IPFS",
      description:
        "Encrypted files are stored on IPFS and referenced by their content identifier.",
      tech: ["IPFS", "Content addressing", "Pinned storage"],
      metrics: { network: "IPFS", address: "CID" },
    },
    {
      icon: FileText,
      title: "Blockchain Registry",
      subtitle: "CID records on-chain",
      description:
        "The smart contract records image CIDs against the connected wallet account for later retrieval.",
      tech: ["Smart contract", "EVM compatible", "On-chain record"],
      metrics: { ownership: "Account", record: "Immutable" },
    },
    {
      icon: Image,
      title: "Secure Retrieval",
      subtitle: "Gallery access by owner",
      description:
        "The app reads the wallet's CIDs, fetches the encrypted files, and renders the recovered images in the gallery.",
      tech: ["Authenticated fetch", "Client retrieval", "Gallery view"],
      metrics: { access: "Owner only", view: "Gallery" },
    },
  ];

  return (
    <div className="w-full">
      <section className="border-b border-zinc-800 pb-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Technical architecture</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              How ImageVault secures your images
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
              ImageVault combines wallet ownership, encrypted upload, IPFS storage, and blockchain records in a simple retrieval flow.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/20">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Core guarantees</h2>
            <div className="mt-5 grid gap-4">
              {[
                ["Encrypted by default", "Files are protected before storage."],
                ["Wallet controlled", "The connected account owns its records."],
                ["Content addressed", "IPFS CIDs identify stored images."],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                  <div>
                    <div className="font-medium text-white">{title}</div>
                    <div className="text-sm text-zinc-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="grid gap-3 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className={`rounded-xl border p-4 text-left ${
                  isActive
                    ? "border-white bg-zinc-900 shadow-2xl shadow-black/20"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-zinc-500"}`} />
                <div className="mt-4 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Step {index + 1}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">{step.title}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/20">
          <div className="grid lg:grid-cols-[1fr_320px]">
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl font-semibold text-zinc-700">
                  {String(activeStep + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">{steps[activeStep].title}</h2>
                  <p className="mt-1 text-sm font-medium text-zinc-500">{steps[activeStep].subtitle}</p>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400">{steps[activeStep].description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {steps[activeStep].tech.map((tech) => (
                  <span key={tech} className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <aside className="border-t border-zinc-800 bg-zinc-950 p-6 lg:border-l lg:border-t-0">
              <div className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Specs</div>
              <div className="mt-5 grid gap-5">
                {Object.entries(steps[activeStep].metrics).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">{key}</div>
                    <div className="mt-1 text-xl font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["256-bit", "Encryption standard"],
          ["IPFS", "Storage network"],
          ["Wallet", "Access control"],
          ["On-chain", "CID registry"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl shadow-black/20">
            <div className="text-2xl font-semibold text-white">{value}</div>
            <div className="mt-1 text-sm text-zinc-500">{label}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HowWeWork;
