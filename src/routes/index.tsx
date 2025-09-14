import { component$, useTask$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MingcuteArrowsDownLine } from "~/components/icons/Arrow";
import { MingcuteDiscordFill } from "~/components/icons/Discord";
import { MingcuteGithubFill } from "~/components/icons/Github";
import { github, GITHUB_ID, GithubRepo, GithubUser } from "~/lib/api/github";
import { lanyard, LanyardUser } from "~/lib/api/lanyard";

export default component$(() => {
	const lan = useSignal<LanyardUser["data"] | null>(null)
	const gh = useSignal<GithubUser | null>(null)
	const repos = useSignal<GithubRepo[]>([])

	useTask$(async () => {
		lan.value = await lanyard.me()		
		gh.value = await github.me()

    repos.value = await (await github.repos(gh.value?.login ?? ""))
      // dots for the what im doing section
      // .sort((a, b) => b.stargazers_count - a.stargazers_count)
      // .slice(0, 3)
      // .filter(r => !(r.full_name.includes("shelter") || r.full_name.includes("lyntr")));

    console.log("lanyard:", lan.value)
    console.log("github:", gh.value)
    console.log("repos:", repos.value.map(r => r.og_url))
	})

	return (
		<>
			<div class="w-full h-screen flex flex-col justify-center items-center bg-stone-950 p-6" id="0">
				<div class="flex flex-col items-center gap-4" data-aos="fade-up">
					<div
						class="flex items-center gap-6 text-9xl"
						data-aos="fade-up"
					>
						<img
							class="rounded-full aspect-square h-[1em] w-[1em] object-cover border-3"
							style={{
								borderColor: Object.entries({
									"dnd": "oklch(63.7% 0.237 25.331)"
								}).find(([k]) => k === lan.value?.discord_status)?.[1] ?? "transparent",
							}}
							src={`https://avatars.githubusercontent.com/u/${GITHUB_ID}?v=4`}
							loading="lazy"
						/>

						<p
							class="font-serif text-orange-50" 
							data-aos="fade-up"
							data-aos-delay="100"
						>
							{gh.value?.name ?? "grunge"}
						</p> 
					</div>

					<div
						class="flex text-sm w-full text-orange-50/50 italic text-center justify-between"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						<p class="hover:text-orange-50/75 transition-all duration-200">
							{gh.value?.bio ?? "swe, we & student"}
						</p>

						<div
							class="flex items-center gap-2 *:w-6 *:h-6 *:hover:text-orange-50/75 *:transition-all *:duration-200"
							data-aos="fade-up"
							data-aos-delay="300"
						>
							<MingcuteDiscordFill />
							<MingcuteGithubFill />
						</div>
					</div>

					<a href="#1" data-aos="fade-up" data-aos-delay="1000" data-aos-duration="500">
						<MingcuteArrowsDownLine
							class="text-orange-50/50 w-6 h-6 hover:animate-none hover:text-orange-50/75 transition-all duration-200"
						/>
					</a>
				</div>
			</div>

      <div class="w-full h-screen flex flex-col items-center bg-orange-50 p-6" id="1">
        <div class="max-w-4xl flex flex-col justify-center h-full gap-8">
          <p
            class="font-serif text-stone-950 text-8xl"
            data-aos="fade-right"
            data-aos-delay="350"
          >
            👋 hey, i'm {gh.value?.name ?? "grunge"}.
          </p>

          <p
            class="text-sm text-stone-950/60 italic max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {gh.value?.bio ?? "i build small, fast things - frontend, infra, & experiments."}
          </p>

          <div
            class="flex flex-wrap items-center justify-between gap-4"
            data-aos="fade-up"
            data-aos-delay="650"
          >
            <div class="flex flex-wrap items-center gap-4">
              <a
                href={gh.value?.html_url ?? `https://github.com/${gh.value?.login ?? "grngxd"}`}
                class="flex items-center gap-2 px-4 py-2 rounded-md bg-stone-950 text-orange-50 hover:bg-orange-50 hover:text-stone-950 border-stone-950 border transition-all duration-200"
                target="_blank"
                rel="noreferrer"
              >
                <MingcuteGithubFill class="w-4 h-4" />
                <span class="text-sm">github</span>
              </a>

              <a
                href={lan.value?.discord_user?.id ? `https://discord.com/users/${lan.value.discord_user.id}` : "#"}
                class="flex items-center gap-2 px-4 py-2 rounded-md border border-stone-950 text-stone-950 hover:bg-stone-900 hover:text-orange-50 transition-all duration-200"
                target="_blank"
                rel="noreferrer"
              >
                <MingcuteDiscordFill class="w-4 h-4" />
                <span class="text-sm">
                  discord{lan.value?.discord_status && ` (${lan.value.discord_status})`}
                </span>
              </a>
            </div>

            <a
              href="#3"
              class="text-stone-950 underline underline-offset-4 hover:text-stone-950/75 transition-all duration-200"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              explore {gh.value?.public_repos ?? "a few"} things i've made →
            </a>
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
            data-aos="fade-up"
            data-aos-delay="950"
          >
            <a class="p-4 rounded-md border border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-orange-50 transition-all duration-200" href="#2">
              <p class="font-bold">🛠️ what i use</p>
              <p class="text-sm">qwik, typescript & vite</p>
            </a>

            <a class="p-4 rounded-md border border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-orange-50 transition-all duration-200" href="#3">
              <p class="font-bold">🎯 what i'm doing</p>
              <p class="text-sm">student / hobby projects</p>
            </a>

            <a class="p-4 rounded-md border border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-orange-50 transition-all duration-200" href="#4">
              <p class="font-bold">💌 what i care about</p>
              <p class="text-sm">performance, dx & flow</p>
            </a>
          </div>

          <a
            href="#2"
            class="self-center mt-6"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            <MingcuteArrowsDownLine class="text-stone-950 w-6 h-6 hover:text-stone-950/75 transition-all duration-200" />
          </a>
        </div>
      </div>

      <div class="w-full h-screen flex flex-col justify-center items-start bg-stone-950 p-6" id="2">
        <div class="max-w-4xl w-full flex flex-col gap-2 items-start">
          <p
            class="font-serif text-orange-50 text-5xl sm:text-8xl tracking-tight leading-tight"
            data-aos="fade-left"
            data-aos-delay="350"
          >
            <span>
              🛠️ what i use
            </span>
          </p>

          <p
            class="text-sm text-stone-300 max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            Tools, frameworks and tiny favs I reach for when building small, fast things - focused on performance and developer flow.
          </p>

          <div
            class="flex flex-col md:flex-row gap-4 mt-4"
            data-aos="fade-up"
            data-aos-delay="550"
          >
            <div class="flex items-center gap-3 p-3 rounded-lg border border-stone-800 bg-stone-900/40 hover:bg-stone-900 transition transform hover:-translate-y-1">
              <div class="text-2xl">⚡</div>
              <div>
                <div class="text-sm font-semibold text-orange-50">Qwik</div>
                <div class="text-xs text-stone-400">reactive web framework</div>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-lg border border-stone-800 bg-stone-900/40 hover:bg-stone-900 transition transform hover:-translate-y-1">
              <div class="text-2xl">🧭</div>
              <div>
                <div class="text-sm font-semibold text-orange-50">TypeScript</div>
                <div class="text-xs text-stone-400">typed js superset</div>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-lg border border-stone-800 bg-stone-900/40 hover:bg-stone-900 transition transform hover:-translate-y-1">
              <div class="text-2xl">🚀</div>
              <div>
                <div class="text-sm font-semibold text-orange-50">Vite</div>
                <div class="text-xs text-stone-400">fast dev tooling</div>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-lg border border-stone-800 bg-stone-900/40 hover:bg-stone-900 transition transform hover:-translate-y-1">
              <div class="text-2xl">🎨</div>
              <div>
                <div class="text-sm font-semibold text-orange-50">Tailwind</div>
                <div class="text-xs text-stone-400">utility-first styling</div>
              </div>
            </div>

            <a href="#3" data-aos="fade-up" data-aos-delay="1000" data-aos-duration="500" class="flex justify-center items-center">
              <MingcuteArrowsDownLine
                class="text-orange-50/50 w-6 h-6 hover:animate-none hover:text-orange-50/75 transition-all duration-200"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="w-full min-h-screen flex flex-col justify-center items-center bg-orange-50 p-12" id="3">
        <div class="w-full flex flex-col gap-2 items-center">
          <p
            class="font-serif text-stone-950 text-5xl sm:text-8xl tracking-tight leading-tight"
            data-aos="fade-down"
            data-aos-delay="350"
          >
            <span>
              🎯 what i'm doing
            </span>
          </p>
          <p
            class="text-sm text-stone-700/80 max-w-2xl text-center"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            a few experiments and projects i've built recently - check out my github for more.
          </p>

          <div class="w-full mt-6" data-aos="fade-up" data-aos-delay="650">
            <div class="mx-auto max-w-6xl flex flex-row flex-wrap justify-center gap-6">
              {(repos.value
                ?.filter(r => !r.fork && !r.archived)
                .filter(r => !(r.full_name?.includes("shelter") || r.full_name?.includes("lyntr")))
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 3) ?? [])
                .map((r, i) => (
                  <div
                    key={r.full_name}
                    class="group h-full relative w-[23rem] rounded-md border border-stone-950 text-stone-950 hover:text-orange-50 transition-all duration-200 overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay={((i + 1) * 250) + 350}
                  >
                    <div
                      class="absolute inset-0 z-0 bg-orange-50 transition-colors duration-200 group-hover:bg-stone-950"
                      aria-hidden="true"
                    />
                    <a
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${r.full_name}`}
                      class="absolute inset-0 z-30"
                    />

                    <div class="relative z-10 w-full aspect-video bg-stone-200">
                      <img
                        src={r.og_url}
                        alt={`${r.full_name} preview`}
                        class="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div class="relative z-20 p-4 flex flex-col gap-2">
                      <div class="flex items-start justify-between gap-3">
                        <a
                          href={r.html_url}
                          target="_blank"
                          rel="noreferrer"
                          class="font-serif text-2xl tracking-tight underline-offset-4 hover:underline"
                        >
                          {r.name}
                        </a>
                        <div class="shrink-0 self-start px-2 py-0.5 rounded-full border border-stone-950 bg-orange-50 text-stone-950">
                          <span class="text-xs align-middle">⭐ {r.stargazers_count}</span>
                        </div>
                      </div>

                      {r.description && (
                        <p class="text-sm text-stone-700 group-hover:text-orange-50/80 transition-all duration-200">
                          {r.description}
                        </p>
                      )}

                      <div class="mt-1 flex items-center gap-3 text-xs transition-all duration-200">
                        {r.language && (
                          <span class="inline-flex items-center gap-2 text-stone-700/80 group-hover:text-orange-50/60 transition-all duration-200">
                            <span
                              class="w-2 h-2 rounded-full group-hover:border-white/30"
                              style={{
                                backgroundColor: (() => {
                                  const l = (r.language ?? '').toLowerCase();
                                  const map: Record<string, string> = {
                                    typescript: '#3477c4',
                                    go: "#04abd6",
                                    kotlin: "#a77aff",
                                    java: "#ae711f"
                                  };

                                  return map[l] || "#1c19175F";
                                })()
                              }}
                            />
                            {(r.language.at(0)?.toUpperCase() + r.language.slice(1).toLowerCase())}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div class="mt-4" data-aos="fade-up" data-aos-delay="1350">
            <a
              href={(gh.value?.html_url ?? `https://github.com/${gh.value?.login ?? "grngxd"}`) + "?tab=repositories"}
              target="_blank"
              rel="noreferrer"
              class="text-stone-900 underline underline-offset-4 hover:text-stone-900/60 transition-all"
            >
              view {Math.max(0, (repos.value ?? []).length - 3)} more experiments →
            </a>
          </div>
        </div>
      </div>
		</>
	);                                                                                                                                                                                                        
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
