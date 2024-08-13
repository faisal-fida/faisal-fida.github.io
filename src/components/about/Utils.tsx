import Django from "../../assets/logos/django.png";
import GithubActions from "../../assets/logos/github_actions.svg";
import Scrapy from "../../assets/logos/scrapy.png";
import ScikitLearn from "../../assets/logos/scikit_learn.png";
import Langchain from "../../assets/logos/langchain.png";
import Tflite from "../../assets/logos/tflite.png";
import Redis from "../../assets/logos/redis.png";
import Fastapi from "../../assets/logos/fastapi.png";
import Huggingface from "../../assets/logos/huggingface.png";
import Plotly from "../../assets/logos/plotly.png";
import Celery from "../../assets/logos/celery.png";
import Llamaindex from "../../assets/logos/llamaindex.png";
import Ollama from "../../assets/logos/ollama.png";
import Selenium from "../../assets/logos/selenium.png";
import Docker from "../../assets/logos/docker.png";
import Postgresql from "../../assets/logos/postgresql.png";
import LlamaCpp from "../../assets/logos/llama_cpp.png";
import Streamlit from "../../assets/logos/streamlit.png";
import Aws from "../../assets/logos/aws.png";
import Pytest from "../../assets/logos/pytest.svg";
import Tensorflow from "../../assets/logos/tensorflow.webp";
import Pandas from "../../assets/logos/pandas.png";

const imageMap: { [key: string]: string } = {
  django: Django,
  github_actions: GithubActions,
  scrapy: Scrapy,
  scikit_learn: ScikitLearn,
  langchain: Langchain,
  tflite: Tflite,
  redis: Redis,
  fastapi: Fastapi,
  huggingface: Huggingface,
  plotly: Plotly,
  celery: Celery,
  llamaindex: Llamaindex,
  ollama: Ollama,
  selenium: Selenium,
  docker: Docker,
  postgresql: Postgresql,
  llama_cpp: LlamaCpp,
  streamlit: Streamlit,
  aws: Aws,
  pytest: Pytest,
  tensorflow: Tensorflow,
  pandas: Pandas,
};

export default imageMap;
