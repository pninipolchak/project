import os
from dotenv import load_dotenv

load_dotenv()

class DB:
    DB_NAME=os.getenv("DB_NAME")
    COLLECTION_NAME=os.getenv("COLLECTION_NAME")
    # HOST=os.getenv("MONGO_HOST")
    # PORT=int(os.getenv("MONGO_PORT"))
    ATLAS_URL=os.getenv('ATLAS_URL')

class DolarRates:
    URL="https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/?c%5BDATA_TYPE%5D=OF00&c%5BBASE_CURRENCY%5D=USD&lastNObservations=1&format=sdmx-json&normalisefreq=M;mean&round=2"